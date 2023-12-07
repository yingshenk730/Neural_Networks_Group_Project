import os
import numpy as np
import tensorflow as tf
from joblib import load
import pandas as pd



# def get_tensorflow_model() -> Sequential:
#   tf_model_path = os.path.join('training_neural_network', 'tensorflow_model')
#   loaded_model = tf.keras.models.load_model(tf_model_path)
#   return loaded_model


# def get_sklearn_preprocessing_pipeline() -> Pipeline:
#   sklearn_pipeline_path = os.path.join('training_neural_network', 'preprocessing_pipeline.joblib')
#   pipline = load(sklearn_pipeline_path)
#   return pipline


def predict(payload):
  input_df = pd.DataFrame(payload, index=[0])
  

  process_pipeline = load('feature_transformer_pipeline.joblib')

#    # 将输入数据转换为 DataFrame
#   # input_df = pd.DataFrame(inp, columns=[
#   #       'first_term_gpa', 'second_term_gpa', 'first_language', 'funding_numeric', 'school_numeric',
#   #       'fasttrack_numeric', 'coop_numeric', 'residency_numeric', 'gender_numeric', 'previous_education',
#   #       'age_group', 'high_school_average', 'math_score', 'english_grade'
#   #   ])
#   input_df = pd.DataFrame(inp, columns=[
#     'First Term Gpa', 'Second Term Gpa', 'First Language', 'Funding numeric', 'School numeric',
#     'FastTrack numeric', 'Coop numeric', 'Residency numeric', 'Gender numeric', 'Previous Education',
#     'Age Group', 'High School Average Mark', 'Math Score', 'English Grade'
# ])


  preprocessed_data = process_pipeline.transform(input_df)

  model = tf.keras.models.load_model('best_model.h5')
  
  return model.predict(preprocessed_data)