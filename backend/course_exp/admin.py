from django.contrib import admin
from .models import Course
from .models import Genedreq
from .models import Professor
from .models import Section
from .models import UserInput
from .models import UserInfo


class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_id', 'coursenumber', 'dept', 'description', 'credits')


class GenedreqAdmin(admin.ModelAdmin):
    list_display = ('coursenumber', 'dept', 'yearterm',
                    'title', 'acp', 'cs', 'hum', 'nat', 'qr', 'sbs')


class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'dept')


class SectionAdmin(admin.ModelAdmin):
    list_display = ('sectionid', 'professorid', 'professors',
                    'coursenumber', 'dept', 'yearterm', 'avggpa')


class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('username', 'password')


class UserInputAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'avg_gpa', 'course_req',
                    'fav_professor', 'interests')


# Registering the models
admin.site.register(Course, CourseAdmin)
admin.site.register(Genedreq, GenedreqAdmin)
admin.site.register(Professor, ProfessorAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(UserInput, UserInputAdmin)
