# Step 1: استخدام صورة Node.js لبناء التطبيق
FROM node:20 AS build

# إنشاء مجلد للعمل
WORKDIR /app

# نسخ ملفات المشروع إلى المجلد
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء المشروع
RUN npm run build --prod

# Step 2: استخدام Nginx لخدمة الملفات النهائية
FROM nginx:1.25

# نسخ الملفات المبنية من المرحلة السابقة إلى Nginx
COPY --from=build /app/dist/financial-dashboard /usr/share/nginx/html

# فتح المنفذ 80
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]
