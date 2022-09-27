from django.db import models
import datetime
# Create your models here.
class Person(models.Model):
    # 个人ID primary_key=True: 该字段为主键
    personId =  models.CharField('ID',primary_key = True, max_length = 15, null = False)
    # 姓名 字符串 最大长度为30
    name = models.CharField('姓名', max_length=30,default = "unknown", null = False)
    # 年龄 整数 null=False, 表示该字段不能为空
    age = models.IntegerField('年龄', null = False,default = 0)
    # 创建时间 auto_now_add：只有在新增的时候才会生效
    createTime = models.DateTimeField(auto_now_add = True, null = False)
    # 修改时间 auto_now： 添加和修改都会改变时间
    modifyTime = models.DateTimeField(auto_now = True, null = False)
    # 性别 布尔类型 默认True: 男生 False:女生
    sex = models.BooleanField('性别', default = True, null = False)
    warning = models.BooleanField('警告',default = False, null = False)
    # 查看是否戴安全帽
    isWearHat = models.BooleanField('是否戴帽',default = True, null=False)
    # def calculate_waiting_time(self):
    #     if (modifyTime - createTime > datetime.timedelta(minutes=1)):


# class Camera(models.Model):
#     # 监视器ID primary_key=True: 该字段为主键
#     cameraId = models.CharField('c_Id',primary_key = True,max_length = 3)
#     # 等待时间
#     waittime = models.TimeField(default = 0)
#     camera_location = models.TimeField


