import React, { useState } from 'react';


interface EmailFormProps {
  onSend: (email: string, note: string, setError: (msg: string) => void) => void;
  onCancel: () => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ onSend, onCancel }) => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !note) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    setError('');
    onSend(email, note, setError);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 p-2 bg-gray-50 rounded shadow">
  {error && <div className="text-xs text-red-600 mb-1">{error}</div>}
  <label className="text-xs font-medium">E-posta adresiniz</label>
      <input
        type="email"
        className="border rounded px-2 py-1 text-xs"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label className="text-xs font-medium">Notunuz / İsteğiniz</label>
      <textarea
        className="border rounded px-2 py-1 text-xs"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={3}
        required
      />
      {error && <div className="text-xs text-red-500">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-primary-500 text-white px-3 py-1 rounded text-xs">Gönder</button>
        <button type="button" className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs" onClick={onCancel}>Vazgeç</button>
      </div>
    </form>
  );
};
