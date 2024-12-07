import React, { useState } from 'react';
import { Lock, Unlock, Copy, CheckCircle } from 'lucide-react';
import { encrypt, decrypt } from '../utils/crypto';

export function EncryptionForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await (mode === 'encrypt' ? encrypt(input) : decrypt(input));
      setOutput(result);
    } catch (err) {
      setError('Invalid input or encryption format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setMode('encrypt')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            mode === 'encrypt'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Lock className="w-4 h-4 mr-2" />
          Encrypt
        </button>
        <button
          onClick={() => setMode('decrypt')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            mode === 'decrypt'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Unlock className="w-4 h-4 mr-2" />
          Decrypt
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              mode === 'encrypt'
                ? 'Enter text to encrypt...'
                : 'Enter encrypted text to decrypt...'
            }
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}

        {output && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {mode === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <Copy className="w-4 h-4 mr-1" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="w-full p-3 bg-gray-50 rounded-lg break-all">
              {output}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}