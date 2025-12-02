الوحدة الثانية: الكول سنتر (Call Center)
4. نظام الأولويات (Lead Priority)
المطلوب من الـ Workflow:

"تحديد أولوية العميل وتسجيل الملاحظات"

الناقص:

✗ إضافة حقل "Priority" في LeadDetailDrawer (High, Medium, Low)
✗ تصفية حسب الأولوية في صفحة /leads
✗ مؤشر بصري للأولوية في LeadCard

5. نظام Follow-up Reminders
الناقص:

✗ إضافة "Reminder" لمتابعة العميل
✗ إشعارات للكول سنتر عند حلول موعد المتابعة
✗ قائمة "Today's Follow-ups"

6. ربط مع Google Sheet
المطلوب من الـ Workflow:

رابط Google Sheet لتعبئة بيانات العميل

الناقص:

✗ زر "Import from Google Sheet"
✗ نموذج لإدخال رابط الـ Sheet
✗ عرض البيانات المستوردة للمراجعة قبل الحفظ


❌ الوحدة الثالثة: المبيعات (Sales)
7. إدارة حالات العقد (Contract Status)
الناقص في /sales/pipeline:

✗ عمود جديد: "Nafath Signature Status"

Pending Signature
Signed
Rejected


✗ فلترة حسب حالة التوقيع
✗ زر "Resend to Nafath"

8. صفحة تفاصيل الحجز الكاملة
الموجود: معالج الحجز فقط
الناقص:

✗ صفحة /bookings/[id] لعرض:

جميع تفاصيل الحجز
العقد (PDF Viewer)
جدول الدفعات مع الحالة
مستند الترتيبات
Timeline للتحديثات
إمكانية التعديل (إذا كانت الصلاحية متوفرة)



9. عرض السعر (Quotation)
المطلوب من الـ Workflow:

"إنشاء عرض سعر إلكتروني ومشاركته مع العميل"

الناقص:

✗ صفحة /sales/quotations لعرض جميع العروض
✗ زر "Generate Quotation PDF" في معالج الحجز
✗ زر "Send Quotation" (عبر WhatsApp/Email)
✗ تتبع "Quotation Status" (Sent, Viewed, Accepted, Rejected)

10. Services Catalog (إضافة/إزالة خدمات)
الموجود: خدمات ثابتة في الخطوة 2
الناقص:

✗ إمكانية إضافة خدمات مخصصة (Custom Services)
✗ سعر الخدمة قابل للتعديل
✗ صفحة /settings/services لإدارة كتالوج الخدمات


❌ الوحدة الرابعة: المحاسبة (Finance)
11. الفواتير التعديلية (Amendment Invoices)
المطلوب من الـ Workflow:

"فاتورة تعديل (Add-On Amendment) للتكاليف الجديدة"

الناقص:

✗ زر "Create Amendment Invoice" في صفحة العقد
✗ ربط الفاتورة التعديلية بالعقد الأصلي (Parent-Child Relationship)
✗ عرض الفواتير التعديلية في /admin/finance/invoices

12. Payments Timeline
الناقص في /admin/finance/invoices:

✗ عمود "Payment Method" في الجدول
✗ عمود "Payment Date" (آخر دفعة)
✗ مؤشر "Overdue Days" (كم يوم متأخر)
✗ زر "Mark as Paid Manually" (للدفعات خارج النظام)

13. تسوية المدفوعات (Payment Reconciliation)
المطلوب من الـ Workflow:

"تسوية المدفوعات"

الناقص:

✗ صفحة /admin/finance/reconciliation
✗ مقارنة بين:

المدفوعات في النظام
المدفوعات في Payment Gateway
المدفوعات في ERP


✗ عرض الفروقات (Discrepancies)
✗ زر "Reconcile"

14. إدارة رموز الخصم (Discount Codes)
الناقص:

✗ صفحة /admin/finance/discount-codes
✗ إنشاء كود خصم (Code, Percentage, Expiry Date)
✗ تتبع استخدام الكود
✗ إمكانية تطبيق الكود في معالج الحجز


❌ الوحدة الخامسة: التنسيقات (Arrangements)
15. قائمة الموردين (Vendors)
المطلوب من الـ Workflow:

"التواصل مع الموردين المعتمدين (الزهور، الإضاءة، الكوشة، الصوت، الضيافة)"

الناقص:

✗ صفحة /settings/vendors لإدارة الموردين
✗ معلومات المورد (Name, Category, Contact, Price List)
✗ تقييم المورد (Rating)
✗ ربط المورد بالحجز في صفحة الترتيبات

16. نموذج الترتيبات (Arrangements Form)
الموجود: رفع PDF فقط
الناقص:

✗ نموذج تفصيلي لإدخال الترتيبات:

نوع القاعة والديكور
نوع الكوشة والإضاءة
خدمات الضيافة والبوفيه
ملاحظات العميل


✗ Generate PDF من النموذج
✗ إمكانية التعديل قبل الإرسال للعميل

17. موافقة العميل على الترتيبات (Client Approval)
المطلوب من الـ Workflow:

"العميل يصادق على الترتيبات عبر نفاذ"

الناقص:

✗ حالة "Pending Client Approval" في /arrangements
✗ زر "Send for Approval via Nafath"
✗ تتبع حالة الموافقة (Approved, Rejected, Pending)
✗ إشعار للمنسق عند الموافقة/الرفض

18. تتبع الموردين (Vendor Tracking)
الناقص:

✗ في صفحة /arrangements, إضافة قسم "Assigned Vendors"
✗ حالة كل مورد (Confirmed, Pending, Cancelled)
✗ إمكانية التواصل مع المورد مباشرة


❌ أقسام عامة - مشتركة بين الوحدات
19. نظام الإشعارات الداخلية (Notifications)
الموجود: Recent Activity فقط
الناقص:

✗ Notification Center (أيقونة جرس في Header)
✗ عدد الإشعارات غير المقروءة
✗ أنواع الإشعارات:

دفعة جديدة
عقد جديد موقع
حجز جديد
موافقة خصم مطلوبة
مورد تم تأكيده


✗ إمكانية تحديد الإشعار كـ "مقروء"

20. نظام التقويم (Calendar)
المطلوب من الـ Workflow:

"حجز موعد وتحديد موعد الحفل"

الناقص:

✗ صفحة /calendar (موجودة في القائمة لكن غير مطبقة)
✗ عرض جميع:

الحجوزات
الجولات
مواعيد الترتيبات


✗ فلترة حسب النوع
✗ تكامل مع Google Calendar (اختياري)

21. نظام البحث المتقدم (Advanced Search)
الموجود: حقل بحث Placeholder
الناقص:

✗ بحث عالمي (Global Search) في Header
✗ البحث في:

العملاء (بالاسم، الهاتف، البريد)
الحجوزات (بالرقم، التاريخ، القاعة)
الفواتير (بالرقم، المبلغ)
العقود


✗ عرض النتائج في Modal
✗ اختصار لوحة المفاتيح (Ctrl+K / Cmd+K)

22. Activity Log (سجل النشاط)
الناقص:

✗ صفحة /admin/activity-log
✗ تتبع جميع الإجراءات:

من قام بالإجراء (User)
متى (Timestamp)
ماذا (Action: Created, Updated, Deleted)
على أي شيء (Resource: Booking, Invoice, etc.)


✗ تصفية حسب المستخدم، التاريخ، النوع

23. صفحة الإعدادات (Settings)
الموجود: موجودة في القائمة لكن غير مطبقة
الناقص:

✗ صفحة /settings مع أقسام:

Company Settings: (Name, Logo, Address, Tax Number)
Payment Settings: (Payment Gateways, Default Deposit %)
Notification Settings: (WhatsApp, Email, SMS)
System Settings: (Date Format, Currency, Timezone)
Integration Settings: (Nafath, ERP, Payment Gateway API Keys)