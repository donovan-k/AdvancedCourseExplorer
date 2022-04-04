from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import CourseSerializer, GenedreqSerializer, ProfessorSerializer,  SectionSerializer, \
    UserInfoSerializer, UserInputSerializer
from .models import Course, Genedreq, Professor, Section, UserInfo, UserInput


# Create your views here.
class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    # used to query the data set back using the query parameters
    def get_queryset(self):
        contains_term = self.request.query_params['containsTerm']
        print(contains_term)
        contains_list = str(contains_term).split(';')

        return self.filter_contains(contains_list)

    # since each interest is separated by a semicolon, we have to filter multiple times
    def filter_contains(self, contain_list):
        course = Course.objects
        for term in contain_list:
            course = course.filter(description__contains=term)

        return course


class GenedreqView(viewsets.ModelViewSet):
    serializer_class = GenedreqSerializer
    queryset = Genedreq.objects.all()


class ProfessorView(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()


class SectionView(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()


class UserInfoView(viewsets.ModelViewSet):
    serializer_class = UserInfoSerializer
    queryset = UserInfo.objects.all()


class UserInputView(viewsets.ModelViewSet):
    serializer_class = UserInputSerializer
    queryset = UserInput.objects.all()
