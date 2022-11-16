from django.db import models
import datetime
# Create your models here.
class Person(models.Model):
    # 个人ID primary_key=True: 
    personId =  models.CharField('ID',primary_key = True, max_length = 15, null = False)
    name = models.CharField('姓名', max_length=30,default = "unknown", null = False)
    age = models.IntegerField('年龄', null = False,default = 0)
    createTime = models.DateTimeField(auto_now_add = True, null = False)
    modifyTime = models.DateTimeField(auto_now = True, null = False)
    sex = models.BooleanField('性别', default = True, null = False)
    warning = models.BooleanField('警告',default = False, null = False)
    isWearHat = models.BooleanField('是否戴帽',default = True, null=False)
    # def calculate_waiting_time(self):
    #     if (modifyTime - createTime > datetime.timedelta(minutes=1)):


# class Camera(models.Model):
#     #ID primary_key=True: 
#     cameraId = models.CharField('c_Id',primary_key = True,max_length = 3)
#     waittime = models.TimeField(default = 0)
#     camera_location = models.TimeField


