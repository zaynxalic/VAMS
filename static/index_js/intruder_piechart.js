var intruderchart = echarts.init(document.getElementById('intruder'));

var intruder_data;

var intruderArea;

var eventNum_0;

var succeedGainIntruderData = true;

var intruder_data_color;

var intruder_labels = [''];

function setajax_intruder(){

  intruder_data = [{'name': no_data,'value':0}];
  intruder_labels = ['']
 


  $.ajax({
    method:"GET",
    url:"http://172.16.138.39/quickstart/camera-list/",
   
    success:function(d){
      succeedGainIntruderData = true;
      eventNum_0 = d.count;

      for (var i = 0;i <eventNum_0;i++){
         intruderArea = (JSON.parse(d.results)[i]).fields.camera_from;

         if ((JSON.parse(d.results)[i]).fields.eventName == "Intrusion"){
          var oneEventCount_0 = parseInt((JSON.parse(d.results)[i]).fields.count);

          if (intruder_data[0].name == no_data){

            intruder_data[0].name = intruderArea;
            intruder_data[0].value = oneEventCount_0;
            intruder_labels[0] = intruderArea;

          }else{

            var flag = true;
            for (var j=0;j<intruder_data.length;j++){
              if(intruder_data[j].name == intruderArea){
                flag = false;
                intruder_data[j].value = intruder_data[j].value + oneEventCount_0;
              }
            }
            if (flag){
              intruder_labels.push(intruderArea);
              intruder_data.push({'name':intruderArea,'value':oneEventCount_0});
              
            }

          }
          
          
        }

      }

      if ((intruder_data[0].name !=='')){
        intruder_data_color = DataColor;
        setintruderChart();
      }else{
        // lingerchart.hideLoading();
        intruder_data_color = noDataColor;
        setintruderChart();
      }

    },

    error: function(error_data){
      succeedGainLingerData = false;
      console.log("error")
      console.log(error_data)
    }
  })
}


setajax_intruder();
setInterval(function(){
  setajax_intruder()
},60000)

function setintruderChart(){
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
      data: intruder_labels,
  
    },
    series: [
      {
        x: 'center',
        y: 'center',
        type: 'pie',
        avoidLabelOverlap: false,
        radius: ['35%', '60%'],  
        data: intruder_data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowColor: 'rgba(30, 144, 255，0.5)'
          }
        },
        labelLine: {
          normal: {
            show: true  
          }
        },
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
  
  intruderchart.setOption(option);

}


