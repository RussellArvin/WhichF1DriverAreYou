import torch 
from fastapi import FastAPI, HTTPException 
from pydantic import BaseModel 
from transformers import LlavaForConditionalGeneration, AutoTokenizer 
import intel_npu_acceleration_library 
 
app = FastAPI() 
 
# Global variables to store the model and tokenizer 
model = None 
tokenizer = None 
 
class Query(BaseModel): 
    prompt: str 
 
def load_model(): 
    global model, tokenizer 
    checkpoint = "Intel/llava-gemma-2b" 
    model = LlavaForConditionalGeneration.from_pretrained(checkpoint) 
    model = intel_npu_acceleration_library.compile(model) 
    tokenizer = AutoTokenizer.from_pretrained(checkpoint) 
 
@app.on_event("startup") 
async def startup_event(): 
    load_model() 
 
@app.post("/generate") 
async def generate(query: Query): 
    try: 
        inputs = tokenizer(query.prompt, return_tensors="pt") 
        with torch.no_grad(): 
            generate_ids = model.generate(**inputs, max_new_tokens=30) 
        output = tokenizer.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0] 
        return {"response": output} 
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e)) 
 
if name == "__main__": 
    import uvicorn 
    uvicorn.run(app, host="0.0.0.0", port=8000)