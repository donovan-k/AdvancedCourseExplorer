"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import sys
sys.path.append("..")
from course_exp import views

router = routers.DefaultRouter()
router.register(r'courses', views.CourseView, 'courses')
router.register(r'genedreqs', views.GenedreqView, 'genedreq')
router.register(r'professors', views.ProfessorView, 'professor')
router.register(r'sections', views.SectionView, 'section')
router.register(r'userinfos', views.UserInfoView, 'userinfo')
router.register(r'userinputs', views.UserInputView, 'userinput')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/coolq1/', views.AdvancedQuery1View.as_view(), name='coolq1'),
    path('api/coolq2/', views.AdvancedQuery2View.as_view(), name='coolq2')
]
