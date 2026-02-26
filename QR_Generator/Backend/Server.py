from fastapi import FastAPI,Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import io
import segno

app= FastAPI()
app.add_middleware( CORSMiddleware,
                   allow_origins=["*"],
                   allow_methods=["*"],
                   allow_headers=["*"],
                   allow_credentials=True
                )
class text_QR(BaseModel):
    text: str
@app.post("/generate_qr")
def generate_qr(data:text_QR):
    qr=segno.make(data.text)
    out= io.BytesIO()
    qr.save(out, kind='png', scale=10)
    return Response(content=out.getvalue(), media_type="image/png")
 

