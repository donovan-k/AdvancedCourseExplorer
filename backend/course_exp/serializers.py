from abc import ABC

from rest_framework import serializers
from .models import Course
from .models import Genedreq
from .models import Professor
from .models import Section
from .models import UserInfo
from .models import UserInput


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('course_id', 'coursenumber', 'dept', 'description', 'credits')


class GenedreqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genedreq
        fields = ('coursenumber', 'dept', 'yearterm',
                  'title', 'acp', 'cs', 'hum', 'nat', 'qr', 'sbs')


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ('id', 'name', 'dept')


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('sectionid', 'professorid', 'professors',
                  'coursenumber', 'dept', 'yearterm', 'avggpa')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('username', 'password')


class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = ('id', 'username', 'avg_gpa', 'course_req',
                  'fav_professor', 'interests')
