from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import *
from .models import *

from .utils import *

# Create your views here.

class ProjectListCreateAPI(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (AllowAny, )

class ProjectEditAPI(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (AllowAny, )

class FetchSummaryAPI(GenericAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (AllowAny, )

    def get(self, request, pk, *args, **kwargs):
        project = self.queryset.get(pk=pk)
        ret_dict = {}
        status = 0
        try:
            summary = get_summary(project.wiki_title)
            ret_dict['summary'] = summary
            ret_dict['title'] = project.wiki_title
            status = 200
        except:
            ret_dict['status'] = 'Error Occured'
            status = 400
        return Response(ret_dict, status=status)

class SentencesAPI(RetrieveUpdateDestroyAPIView):
    queryset = Sentence.objects.all()
    serializer_class = SentenceSeraializer
    permissions = (AllowAny, )

    def get(self, request, pk, *args, **kwargs):
        project = Project.objects.get(pk=pk)
        ret_dict = {}
        status = 0
        try:
            sentences = []
            if self.queryset.filter(project=pk).count() < 1:
                summary = get_summary(project.wiki_title)
                get_sentences = split_into_sentences(summary)
                for sentence in get_sentences:
                    obj = Sentence.objects.create(project=project, orignal_sentence=sentence)
                    obj.save()
                    temp = {}
                    temp['id'] = obj.id
                    temp['sentence'] = obj.orignal_sentence
                    temp['trans_sentence'] = obj.translated_sentence
                    sentences.append(temp)
            else:
                for sentence in self.queryset.filter(project=pk):
                    temp = {}
                    temp['id'] = sentence.id
                    temp['sentence'] = sentence.orignal_sentence
                    temp['trans_sentence'] = sentence.translated_sentence
                    sentences.append(temp)
            ret_dict['title'] = project.wiki_title
            ret_dict['content'] = sentences
            status = 200
        except:
            ret_dict['status'] = 'Error Occured'
            status = 400
        return Response(ret_dict, status=status)
    
    def put(self, request, *args, **kwargs):
        ret_dict = {}
        status = 0
        data = request.data
        try:
            sentence = Sentence.objects.get(pk=int(data['id']))
            sentence.translated_sentence = str(data['translated_sentence'])
            sentence.save()
            ret_dict['status'] = 'Changed'
            status = 202
        except:
            status = 400
        return Response(ret_dict, status=status)
