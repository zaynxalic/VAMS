from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from index.models import Person
# 随机生成名字的import
from faker import Faker
# import rest_framework 作为api
from rest_framework.views import APIView
from rest_framework.response import Response
import random
# Create your views here.   


#getuser 
# User = get_user_model()

def index(request):
    return render(request, 'working_mode.html',{})

# class HatData(APIView):
#     def get(self, request, format=None):
#         # 默认数
#         labels = ["工地1区", "工地2区"]
#         hat_items = [2,1]
#         # 数据
#         hat = [
#             # 
#             {"value" : hat_items[0], "name": labels[0]},
#             #
#             {"value" : hat_items[1], "name": labels[1]},
#         ]
#         return Response(hat);

# class LingerData(APIView):
#     def get(self, request, format=None):
#         # 默认数
#         labels = ["工地1区", "工地2区"]
#         linger_items = [34,202]
#         # 数据
#         linger = [
#             # 
#             {"value" : linger_items[0], "name": labels[0]},
#             #
#             {"value" : linger_items[1], "name": labels[1]},
#         ]
#         return Response(linger);

# class IntruderData(APIView):
#     def get(self, request, format=None):
#         # 默认数
#         labels = ["工地1区", "工地2区"]
#         intruder_items = [224,220]
#         # 数据
#         intruder = [
#             # 
#             {"value" : intruder_items[0], "name": labels[0]},
#             #
#             {"value" : intruder_items[1], "name": labels[1]},
#         ]
#         return Response(intruder);