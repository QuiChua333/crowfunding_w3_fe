function FAQTab({ faqs }) {
  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '32px' }}>Những Câu Hỏi Thường Gặp</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {faqs.map((item, index) => {
          return (
            <div key={index}>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>{item.question}</div>
              <div style={{ color: '#6a6a6a' }}>{item.answer}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQTab;
