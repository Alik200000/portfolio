# 🚀 Production Launch & Infrastructure Guide: Portfolio Production Deployment Repo
> **Основано на стандартах:**
> 1. **Reel 1 (Виталий Влада)**: 50-пунктовый аудит pre-launch, предотвращение рисков вайбкодинга.
> 2. **Reel 2 (Елхан АБК)**: Безопасность финансовых и алгоритмических модулей.
> 3. **Reel 3 (Джамал @jamalozh)**: 3 критических шага запуска любого проекта / SaaS.

---

## 🏛️ ШАГ 1: Архитектура Поддоменов (Subdomain Separation)
Никогда не смешивайте публичный маркетинг и ядро веб-приложения на одном домене!

| Хост | Назначение | Платформа / Стек | Изоляция |
| :--- | :--- | :--- | :--- |
| **`portfolio-9os8.onrender.com`** | Публичный лендинг, визитка, кейсы, SEO-трафик | Fast CDN / Edge (Vercel / Cloudflare / Render) | Публичный доступ, aggressive caching |
| **`app.portfolio-9os8.onrender.com`** | Веб-приложение, личный кабинет, сессии | React / Next.js / Dashboard | Изолированные сессионные Cookie (`Domain=app.portfolio-9os8.onrender.com`) |
| **`api.portfolio-9os8.onrender.com`** | REST API, Webhooks, фоновые очереди | FastAPI / Express / Node.js | CORS whitelist только для `app.portfolio-9os8.onrender.com` и `portfolio-9os8.onrender.com` |
| **`cdn.portfolio-9os8.onrender.com`** | Медиафайлы, PDF накладные, изображения | S3 / Cloudflare R2 | HTTP/2, Brotli, immutable caching |

> [!IMPORTANT]
> **Почему это спасает бизнес:**
> 1. Если бэкенд перегружен запросами, публичный сайт `portfolio-9os8.onrender.com` продолжает открываться мгновенно за 0.2 сек.
> 2. Если на лендинге обновляется дизайн, пользователи приложения в `app.portfolio-9os8.onrender.com` не разлогиниваются и не сталкиваются с downtime.
> 3. Сессионные куки приложения защищены от чтения публичными маркетинговыми скриптами (Яндекс.Метрика, Google Analytics).

---

## ✉️ ШАГ 2: Изоляция Почтовых Потоков (Email Deliverability & DNS)
Никогда не отправляйте транзакционные письма и маркетинг с одного домена!

### 1. Распределение потоков:
- **`auth.portfolio-9os8.onrender.com`** (или `notify.portfolio-9os8.onrender.com`): ТОЛЬКО транзакции (коды входа, сброс пароля, чеки, алерты).
- **`news.portfolio-9os8.onrender.com`** (или `promo.portfolio-9os8.onrender.com`): Рассылки, акции, продуктовые обновления.

### 2. Обязательные DNS-записи для домена `portfolio-9os8.onrender.com`:

#### A. Запись SPF (Sender Policy Framework)
Предотвращает отправку писем от вашего имени чужими серверами:
```dns
Type: TXT
Host: auth.portfolio-9os8.onrender.com
Value: v=spf1 include:_spf.google.com include:mailgun.org ~all
```

#### B. Запись DKIM (DomainKeys Identified Mail)
Цифровая 2048-битная криптографическая подпись каждого исходящего письма:
```dns
Type: TXT
Host: k1._domainkey.auth.portfolio-9os8.onrender.com
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
```

#### C. Запись DMARC (Политика отбрасывания подделок)
Гарантирует 99.8% попадание во входящие (Inbox) и блокирует спуфинг:
```dns
Type: TXT
Host: _dmarc.portfolio-9os8.onrender.com
Value: v=DMARC1; p=reject; rua=mailto:dmarc-reports@portfolio-9os8.onrender.com; pct=100; aspf=s; adkim=s;
```

> [!TIP]
> Политика `p=reject;` указывает почтовым серверам Google, Mail.ru, Yandex и Outlook немедленно уничтожать любые письма от мошенников, пытающихся представиться вашим доменом.

---

## 🔍 ШАГ 3: SEO, Индексация и Безопасность Поиска
- **`robots.txt`**: Сконфигурирован в корне веб-сервера. Разрешает обход основных страниц и закрывает служебные маршруты (`/api/`, `/admin/`, `/auth/`).
- **`sitemap.xml`**: Автоматически сгенерирован со структурой страниц, датами `lastmod` и приоритетами `priority`.
- **Private API / Дашборды**: Закрытые части системы обязаны отдавать заголовок:
  ```http
  X-Robots-Tag: noindex, nofollow, noarchive
  ```

---

## 🛡️ Чек-лист 50 Рисков Вайбкодинга (Pre-Launch Security Audit)
Перед каждым релизом проверять:
- [x] **0 hardcoded secrets**: Все токены (`sk-`, `ghp_`, API ключи) только в `.env`.
- [x] **.gitignore**: `.env`, `.venv`, `node_modules`, `*.db`, `*.log` надежно скрыты от git.
- [x] **Safe Links**: Все внешние ссылки содержат `rel="noopener noreferrer"`.
- [x] **Error Recovery**: Наличие React Error Boundary или глобального exception handler.
- [x] **Double-Submit Protection**: Блокировка кнопок сабмита (`disabled={isSubmitting}`).
- [x] **Mobile First**: Отсутствие горизонтального скролла (`overflow-x-hidden`) и тач-таргеты > 44px.
