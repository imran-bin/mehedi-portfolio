<section id="problem" class="section" style="background:#ffffff">
    <div class="container">
        <div class="section-header fade-in"><span style="color:var(--primary);font-weight:700;letter-spacing:1px">আপনার সমস্যা</span><h2>সমস্যা জানানোর ফর্ম</h2><div class="divider"></div></div>
        <form id="problemForm" class="fade-in" style="max-width:760px;margin:0 auto;padding:28px;border-radius:20px;border:1px solid rgba(0,106,78,0.12);box-shadow:var(--shadow);background:#fff">
            <div class="problem-form-grid" style="display:grid;gap:14px;grid-template-columns:1fr 1fr">
                <input name="name" required placeholder="আপনার নাম" class="problem-input">
                <input name="phone" required placeholder="মোবাইল নম্বর" class="problem-input">
            </div>
            <input name="area" required placeholder="এলাকা / ইউনিয়নের নাম" class="problem-input" style="margin-top:14px">
            <textarea name="problem" required rows="5" placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..." class="problem-input" style="margin-top:14px;resize:vertical"></textarea>
            <button type="submit" class="btn btn-primary" style="margin-top:16px;width:100%">✉️ সমস্যা পাঠান</button>
            <p id="formMsg" style="margin-top:12px;color:var(--primary);font-weight:600;display:none">ধন্যবাদ। আপনার সমস্যাটি গ্রহণ করা হয়েছে।</p>
        </form>
    </div>
</section>