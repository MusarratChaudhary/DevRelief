# # NOTE:
# Ye code sirf testing ke liye hai (model check karne ke liye)
# Isse pata chalta hai ke kaunse Gemini models "generateContent" support karte hain.
# Backend ke main logic me iska koi role nahi hai — sirf future reference ke liye rakha hai.

# import google.generativeai as genai
# from google import genai
# from dotenv import load_dotenv
# import os

# load_dotenv()
# genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# # List available models
# # models = genai.list_models()
# # for model in models:
# #     print(f"Model: {model.name}, Supported: {model.supported_generation_methods}")
# #     # print([m.name for m in client.models.list()])


# for model in genai.list_models():
#     if "generateContent" in model.supported_generation_methods:
#         print(f"{model.name} supports generateContent")

