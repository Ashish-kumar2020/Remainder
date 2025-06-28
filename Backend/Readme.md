# 🚀 Express + TypeScript Starter Template

A minimal and clean setup to kickstart your backend project with **Express** and **TypeScript**.

---

## 📦 Getting Started

### 1. Initialize Node Project

```bash
npm init -y
```

### 2. Install TypeScript

```bash
npm install -D typescript
```

### 3. Initialize TypeScript Configuration

```bash
npx tsc --init
```

Update your `tsconfig.json`:

```json
{
  "rootDir": "./src",
  "outDir": "./dist",
  "strict": true,
  "esModuleInterop": true,
  "moduleResolution": "node",
  "target": "ES6",
  "module": "commonjs"
}
```

---

### 4. Install Express and Type Definitions

```bash
npm install express
npm install -D @types/express
```

---

## 📁 Folder Structure

```
project-root/
├── src/
│   └── index.ts
├── dist/
├── tsconfig.json
├── package.json
```

---
