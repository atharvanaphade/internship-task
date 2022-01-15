from django.db.models import fields
from rest_framework import serializers
from .models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['wiki_title', 'target_lang', 'id']

class SentenceSeraializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ['project', 'orignal_sentence', 'translated_sentence', 'id']