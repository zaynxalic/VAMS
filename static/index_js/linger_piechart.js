var lingerchart = echarts.init(document.getElementById('linger'));

var linger_data;

var eventNum_1 = 0;

var lingerArea;

var succeedGainLingerData = true;

var linger_data_color;

var linger_labels = [''];
function setajax_linger(){

  linger_data = [{'name':'暂无数据','value':0}];
  linger_labels = [''];

  $.ajax({
    method:"GET",
    url:"http://172.16.138.39/quickstart/camera-list/",
    success:function(l){
      succeedGainLingerData = true;
      eventNum_1 = l.count;

      for (var i = 0;i <eventNum_1;i++){
         lingerArea = (JSON.parse(l.results)[i]).fields.camera_from;

         if ((JSON.parse(l.results)[i]).fields.eventName == "Loiter"){

          var oneEventCount_1 = parseInt((JSON.parse(l.results)[i]).fields.count);
          if (linger_data[0].name == no_data){

            linger_data[0].name = lingerArea;
            linger_data[0].value = oneEventCount_1;
            linger_labels[0] = lingerArea;

          }else{

            var flag = true;
            for (var j=0;j<linger_data.length;j++){
              if(linger_data[j].name == lingerArea){
                flag = false;
                linger_data[j].value = linger_data[j].value + oneEventCount_1;
              }
            }

            if (flag){
              linger_data.push({'name':lingerArea,'value':oneEventCount_1})
              linger_labels.push(lingerArea);
            }

          }
          
        }

      }
    

      if ((linger_data[0].name !== no_data)){
        linger_data_color = DataColor;
        // setchart
        setlingerChart();
      }else{
        // lingerchart.hideLoading();

        linger_data_color = noDataColor;

        setlingerChart();
      }
      
      

    },
    error: function(error_data){
      succeedGainLingerData = false;
      console.log("error")
      console.log(error_data)
    }
  })
}

setajax_linger();
setInterval(function(){
  setajax_linger()
},  60000)

function setlingerChart(){
  var option = {

    legend: {
      orient: 'horizontal',
  
      x: 'left',
      y: 'top',
  
      itemWidth: 24,   
      itemHeight: 18,  
      textStyle: {
        color: '#666'  
      },
      backgroundColor: '#eee',  
      data: linger_labels,
  
    },
    series: [
      {
        x: 'center',
        y: 'center',
        type: 'pie',
        radius: ['35%', '60%'],  
        data: linger_data,
        avoidLabelOverlap: false,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(30, 144, 255，0.5)'
          }
        },
        labelLine: {
          normal: {
            show: true   
          }
        },
        // 设置值域的标签
        label: {
          normal: {
            position: 'outer',  
            formatter: '{b}\n{c}'
          }
        },
      }
    ],
    
    grid: {
      left: 0,   
      right: 0, 
      bottom: 0,
      top: 0
    },

    graphic: [
      {
          type: 'image',
          id: 'linger',
          right:  '39%',
          top: '34%',
          z: -10,
          bounding: 'raw',
          // origin: [80, 90],
          style: {
              image: '/static/img/index_img/helmet.png',
              width: 50,
              height: 50,
              opacity: 0.8
          }
      },
    ],

    color:linger_data_color,
  };
  lingerchart.setOption(option);


}


