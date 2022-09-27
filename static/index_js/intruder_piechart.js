// mychart初始化
var intruderchart = echarts.init(document.getElementById('intruder'));

var intruder_data;

var intruderArea;

var eventNum_0;

var succeedGainIntruderData = true;

var intruder_data_color;

var intruder_labels = [''];

function setajax_intruder(){
  
  // 默认数据
  intruder_data = [{'name': no_data,'value':0}];
  intruder_labels = ['']
  // 显示加载动画,无数据
  // intruderchart.showLoading({
  //   text: '加载中',
  //   color: '#ffffff',
  //   textColor: '#8a8e91',
  //   maskColor: 'rgba(255, 255, 255, 0.8)',
  // });


  $.ajax({
    method:"GET",
    url:"http://172.16.138.39/quickstart/camera-list/",
    // 当成功的时候 获取数据
    success:function(d){
      succeedGainIntruderData = true;
      // 获取事件个数
      eventNum_0 = d.count;

      for (var i = 0;i <eventNum_0;i++){
        // 查看是否为闯入事件
         intruderArea = (JSON.parse(d.results)[i]).fields.camera_from;

         if ((JSON.parse(d.results)[i]).fields.eventName == "Intrusion"){
          // 请求获取摄像机位置

          // 获取区域事件数目
          var oneEventCount_0 = parseInt((JSON.parse(d.results)[i]).fields.count);

          // 如果list 中无值
          if (intruder_data[0].name == no_data){

            intruder_data[0].name = intruderArea;
            intruder_data[0].value = oneEventCount_0;
            intruder_labels[0] = intruderArea;

          }else{

            var flag = true;
            for (var j=0;j<intruder_data.length;j++){
              // 如果有该区域
              if(intruder_data[j].name == intruderArea){
                flag = false;
                intruder_data[j].value = intruder_data[j].value + oneEventCount_0;
              }
            }

            // 如果无该区域
            if (flag){
              intruder_labels.push(intruderArea);
              intruder_data.push({'name':intruderArea,'value':oneEventCount_0});
              
            }

          }
          
          
        }

      }

// 如果失败了，则,成功了，则

      if ((intruder_data[0].name !=='')){
        // 隐藏loading 页面
        // intruderchart.hideLoading();
        // setchart
        intruder_data_color = DataColor;
        setintruderChart();
      }else{
        // lingerchart.hideLoading();
        intruder_data_color = noDataColor;
        setintruderChart();
      }

    },


    // 当失败的时候 输出错误
    error: function(error_data){
      succeedGainLingerData = false;
      console.log("error")
      console.log(error_data)
    }
  })
}


setajax_intruder();
// 每隔一段时间获取信息
setInterval(function(){
  setajax_intruder()
},60000)


// 设置饼图
function setintruderChart(){
  var option = {

    legend: {
      orient: 'horizontal',
  
      x: 'left',
      y: 'top',
      // legend 的位置
  
      itemWidth: 24,   // 设置图例图形的宽
      itemHeight: 18,  // 设置图例图形的高
      textStyle: {
        color: '#666'  // 图例文字颜色
      },
      // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
      backgroundColor: '#eee',  // 设置整个图例区域背景颜色
      data: intruder_labels,
  
    },
    series: [
      {
        x: 'center',
        y: 'center',
        type: 'pie',
        avoidLabelOverlap: false,
        radius: ['35%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
        data: intruder_data, //默认数据
        // avoidLabelOverlap: false,
        // itemStyle 设置饼状图扇形区域样式
        itemStyle: {
          // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
          // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowColor: 'rgba(30, 144, 255，0.5)'
          }
        },
        // 设置值域的那指向线
        labelLine: {
          normal: {
            show: true   // show设置线是否显示，默认为true，可选值：true ¦ false
          }
        },
        // 设置值域的标签
        label: {
          normal: {
            position: 'outer',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
            // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  {d}%指这一部分占总数的百分比
            formatter: '{b}\n{c}'
          }
        },
      }
    ],
    
    grid: {
      left: 0,   //距离左边的距离
      right: 0, //距离右边的距离
      bottom: 0,//距离下边的距离
      top: 0 //距离上边的距离
    },
    
    graphic: [
      {
          type: 'image',
          id: 'intruder',
          right:  '38.5%',
          top: '37%',
          z: -10,
          bounding: 'raw',
          // origin: [80, 90],
          style: {
              image: '/static/img/index_img/intruder.png',
              width: 50,
              height: 50,
              opacity: 0.8
          }
      },
    ],
    color:intruder_data_color,
    
  };
  
  intruderchart.setOption(option);//*****自己要定义，定时器只是为了动态改变数据


}


