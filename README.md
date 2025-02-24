# WhatF1DriverAreYou 🏎️

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/2560px-Lenovo_Global_Corporate_Logo.png" alt="Lenovo Logo" height="60">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img src="assets/intel.png" alt="Intel Logo" height="60">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img src="assets/gignite.png" alt="Gignite.ai Logo" height="60">
</p>

An AI-powered application that tells you which Formula 1 driver matches your personality! This project showcases the power of Intel's Neural Processing Unit (NPU) by running a 2B parameter LLM model optimized for Intel hardware. The application combines a general-purpose LLM service with a specialized web interface that handles the F1 driver matching logic.

The NPU is an AI accelerator integrated into Intel Core Ultra processors, featuring Neural Compute Engines for AI operations and Streaming Hybrid Architecture Vector Engines for efficient computing, making it ideal for running AI models like this one. Learn more about the Intel NPU Acceleration Library in the [official documentation](https://intel.github.io/intel-npu-acceleration-library/index.html).

## ⚠️ IMPORTANT: System Requirements

> **This application can ONLY run on devices with an Intel Core Ultra processor that has an integrated Neural Processing Unit (NPU).**
> 
> If your device does not have an Intel NPU, this application will not work.

Required hardware and software:
- Intel Core Ultra processor with integrated NPU (No other processors are supported)
- Windows or Ubuntu Linux (MacOS not supported)
- Latest NPU drivers installed ([Windows](https://www.intel.com/content/www/us/en/download/794477/intel-arc-iris-xe-graphics-windows.html), [Linux](https://dgpu-docs.intel.com/installation-guides/ubuntu/ubuntu-focal-arc.html))

To check if your device has an NPU:
1. Look for "Intel® Core™ Ultra" in your processor name
2. Verify NPU availability in device manager/system information
3. Run Intel's compatibility check tool

## 📸 Singapore F1 Grand Prix 2024 Demo

<div align="center">
  <img src="assets/demo.png" alt="Demo at Lenovo Leaders Circle Singapore" width="300"/>
  <p><em>WhatF1DriverAreYou demo at Lenovo Leaders Circle during the Singapore F1 Grand Prix 2024</em></p>
</div>

This project was showcased at the prestigious Lenovo Leaders Circle event in Singapore, coinciding with the 2024 Formula 1 Singapore Grand Prix. The demonstration highlighted the capabilities of Lenovo's NPU-enabled devices in running sophisticated AI models while maintaining high performance and energy efficiency.

## 🤝 Project Collaboration

This project was developed in collaboration with:

- **Intel**: Providing the LLaVA-Gemma 2B model and the NPU Acceleration Library, which enables optimal AI performance on Intel Core Ultra processors
- **Lenovo**: Providing Intel Core Ultra-powered devices featuring integrated NPUs for optimal model performance
- **Gignite.ai**: Contributing expertise in AI model optimization, web application development, and deployment strategies

The collaboration brings together Intel's AI technology, Lenovo's hardware excellence, and Gignite.ai's AI expertise to create a unique F1 personality matching experience.

## 🚀 Project Overview

WhatF1DriverAreYou consists of two main services:
- **AI Service**: A FastAPI backend running Intel's LLaVA-Gemma 2B model optimized for NPU, serving as a general-purpose language model endpoint
- **Web App**: A modern, responsive frontend application developed by Gignite.ai that handles the F1 driver matching logic and user interaction

## 🛠️ Technical Stack

### AI Service
- FastAPI
- PyTorch
- Intel NPU Acceleration Library
- Transformers (Hugging Face)
- Intel LLaVA-Gemma 2B model

### Web Application
- T3 Stack
- React
- TypeScript
- Next.js
- Tailwind CSS
- tRPC

### Intel NPU Integration
This project leverages Intel's NPU Acceleration Library to optimize model performance. The NPU's architecture includes:
- Neural Compute Engines for AI operations (Matrix Multiplication, Convolution)
- Streaming Hybrid Architecture Vector Engines for general computing
- DMA engines for efficient data transfers between system memory and managed cache
- Compiler optimization for tiled compute and data flow
- Device MMU and IOMMU for security isolation

For implementation details and best practices, refer to the [Intel NPU Acceleration Library Documentation](https://intel.github.io/intel-npu-acceleration-library/index.html).

Note: The Intel® NPU Acceleration Library is currently in active development. For production-ready solutions, please refer to OpenVINO or DirectML.

## 📦 Installation

> ⚠️ **Remember**: This application will only work on devices with an Intel Core Ultra processor containing an NPU.

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WhatF1DriverAreYou.git
cd WhatF1DriverAreYou
```

2. Install dependencies:
```bash
# Install Intel NPU Acceleration Library
pip install intel-npu-acceleration-library

# Install other requirements
pip install -r requirements.txt
```

3. Start the AI service:
```bash
cd ai-service
python main.py
```

The API will be available at `http://localhost:8000`

4. Start the web application:
```bash
cd web-app
pnpm install
pnpm dev
```

The web application will be available at `http://localhost:3000`

## 🔌 API Endpoints

### POST /generate
General-purpose LLM endpoint that processes text prompts using the Intel LLaVA-Gemma 2B model.

**Request Body:**
```json
{
    "prompt": "your prompt here"
}
```

**Response:**
```json
{
    "response": "model generated text response"
}
```

The F1 driver matching logic and specialized prompts are handled by the web application, which uses this endpoint as its foundation for AI functionality.

## 🚧 Project Structure

```
WhatF1DriverAreYou/
├── assets/               # Project assets (logos and demo images)
├── ai-service/          # FastAPI service running Intel's NPU-optimized LLM
│   ├── main.py
│   └── requirements.txt
├── web-app/            # T3 Stack (Next.js + tRPC) web application
│   ├── src
│   │   ├── app        # Next.js app router
│   │   ├── components # UI components
│   │   ├── server     # Backend API routes
│   │   └── trpc       # tRPC configuration
│   └── package.json
└── README.md
```

## 🔮 Features

- Real-time inference using Intel's NPU acceleration
- Optimized model performance through NPU's Neural Compute Engines
- Efficient memory management via DMA engines and managed cache
- RESTful API for easy integration
- Modern web interface built with T3 Stack

## 📋 Requirements

### AI Service
```txt
fastapi
uvicorn
torch
transformers
pydantic
intel-npu-acceleration-library
```

### Web Application
```txt
// package.json dependencies managed by pnpm
"dependencies": {
  "react": "^18.x",
  "next": "^14.x",
  "@trpc/client": "^10.x",
  "@trpc/server": "^10.x",
  "tailwindcss": "^3.x"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Note that you'll need an Intel Core Ultra processor with integrated NPU for development.

## 🙏 Acknowledgments

- Intel for providing the LLaVA-Gemma 2B model and NPU acceleration technology
- Lenovo for providing Intel Core Ultra devices and hosting the showcase at Leaders Circle Singapore
- Gignite.ai for AI expertise, web application development, and system optimization
- The Formula 1 community for inspiration