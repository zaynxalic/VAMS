// For initialisation
var hatchart = echarts.init(document.getElementById('wearing_hat'));

var eventNum_2 = 0;

var hatArea;

var hat_data;
// When no data is shown
const no_data = '暂无数据';

var succeedGainHatData = true;

const noDataColor = ['grey']

const DataColor = ["#c23531","#2f4554", "#61a0a8","#d48265","#91c7ae", "#749f83", "#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"]

var hat_data_color;

var hat_labels = [''];
function setajax_hat(){
  hat_data = [{'name':no_data,'value':0}];
  hat_labels = [''];

  $.ajax({
    method:"GET",
    url:"http://172.16.138.39/quickstart/camera-list/",
    success:function(h){

      succeedGainHatData = true;
      eventNum_2 = h.count;

      for (var i = 0;i <eventNum_2;i++){
        hatArea = (JSON.parse(h.results)[i]).fields.camera_from;
         if ((JSON.parse(h.results)[i]).fields.eventName == "noHelmet"){
          // Request for camera position

           // Get the number of events in the area
          var oneEventCount_2 = parseInt((JSON.parse(h.results)[i]).fields.count);
         
          if (hat_data[0].name == no_data){

            hat_data[0].name = hatArea;
            hat_data[0].value = oneEventCount_2;
            hat_labels[0] = hatArea;

          }else{

            var flag = true;
            for (var j=0;j<hat_data.length;j++){
              // if the area is obtianed
              if(hat_data[j].name == hatArea){
                flag = false;
                hat_data[j].value = hat_data[j].value + oneEventCount_2;
              }
            }

            // If the area does not exist
            if (flag){
              hat_data.push({'name':hatArea,'value':oneEventCount_2})
              hat_labels.push(hatArea);
            }

          }
          
          
        }

      }

        if ((hat_data[0].name !== '暂无数据')){

          // hide the loading screen
          // hatchart.hideLoading();
          hat_data_color = DataColor;
          // setchart
          sethatChart();

        }else{
          // hatchart.hideLoading(); 
          hat_data_color = noDataColor;
          sethatChart();
        }
      

    },
    // When it fails Output error
    error: function(error_data){
      succeedGainHatData = false;
      console.log("error");
      console.log(error_data);
    }
  })
}


setajax_hat();
// Access to information at regular intervals
setInterval(function(){
  setajax_hat();
},60000)

function sethatChart(){
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
      data: hat_labels,
  
    },
    series: [
      {
        x: 'center',
        y: 'center',
        type: 'pie',
        radius: ['35%', '60%'], 
        data: hat_data, 
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
  
        label: {
          normal: {
            position: 'outer', 
            formatter: '{b}\n{c}'
          }
        },
      }
    ],
    graphic: [
      {
          type: 'image',
          id: 'hat',
          right:  '38.5%',
          top: '35%',
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
    grid: {
      left: 0,   
      right: 0, 
      bottom: 0,
      top: 0
    },

    color:hat_data_color,

  };
  
  hatchart.setOption(option);

}


