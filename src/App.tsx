import React from 'react';
import { Shield } from 'lucide-react';
import { EncryptionForm } from './components/EncryptionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Secure Text Encryption
          </h1>
          <p className="text-gray-600">
            Encrypt and decrypt your messages with AES-256-CBC encryption
          </p>
        </div>
        
        <div className="flex justify-center">
          <EncryptionForm />
        </div>
      </div>
    </div>
  );
}

export default App;