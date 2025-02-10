import  { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { apiClient } from '../../libs/axios';

interface UploadResult {
  success: boolean;
  email: string;
  error?: string;
}

const ManageAdmin = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (uploadedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        && uploadedFile.type !== 'text/csv') {
        setError('Please upload only Excel or CSV files');
        return;
      }
      setFile(uploadedFile);
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/admin/upload-students', formData);
      setResults(response.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults([]);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bulk Student Upload</h1>
        <p className="text-gray-600 mt-2">Upload Excel or CSV file containing student data</p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${file ? 'bg-gray-50' : 'hover:bg-gray-50'}
            transition-colors duration-200
          `}
        >
          <input {...getInputProps()} />

          {file ? (
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your file here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Only Excel (.xlsx) or CSV files are supported
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {file && !results.length && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`
                px-4 py-2 rounded-md text-white font-medium
                ${isUploading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}
                transition-colors duration-200
              `}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Upload Results</h2>
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Upload Another File
            </button>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium text-gray-500 border-b">
              <div>Email</div>
              <div>Status</div>
              <div>Details</div>
            </div>

            <div className="divide-y">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 text-sm items-center"
                >
                  <div className="text-gray-900">{result.email}</div>
                  <div className="flex items-center">
                    {result.success ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-700">Success</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-700">Failed</span>
                      </>
                    )}
                  </div>
                  <div className="text-gray-500">
                    {result.error || 'Processed successfully'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Summary: </span>
              {results.filter(r => r.success).length} successful,
              {results.filter(r => !r.success).length} failed
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAdmin