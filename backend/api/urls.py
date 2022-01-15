from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('create_project/', ProjectListCreateAPI.as_view(), name='create-project'),
    path('edit_project/<int:pk>', ProjectEditAPI.as_view(), name='edit-project'),
    path('fetch_summary/<int:pk>', FetchSummaryAPI.as_view(), name='fetch-summary'),
    path('sentences/<int:pk>', SentencesAPI.as_view(), name='fetch-sentences'),
]