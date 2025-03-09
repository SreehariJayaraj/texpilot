'use client'
import Editor from '@monaco-editor/react'
import { Document, Page, pdfjs } from 'react-pdf'
import SplitPane from 'react-split-pane'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface ProjectData {
  id: string
  name: string
  content: string
  pdfUrl: string
}

const mockProject: ProjectData = {
  id: '1',
  name: 'LaTeX Document',
  content: `\\documentclass{article}
\\begin{document}
Hello, World!
\\end{document}`,
  pdfUrl: '/sample.pdf'
}

export default function ProjectPage() {



  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize="50%"
          style={{ height: 'calc(100vh - 64px)' }} // Adjust based on your header height
        >
          {/* Editor Panel */}
          <div className="h-full">
            <Editor
              height="100%"
              defaultLanguage="latex"
              theme="vs-dark"
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on'
              }}
            />
          </div>

          {/* PDF Preview Panel */}
          <div className="h-full flex flex-col bg-gray-100">
            <div className="flex items-center justify-between p-2 border-b bg-white">
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                 
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page 
                </span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                
                >
                  Next
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                 
                >
                  -
                </button>
                <span className="text-sm">12%</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                 
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <Document
                loading={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                  </div>
                }
              >
                <Page
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </div>
          </div>
        </SplitPane>
      </div>
    </div>
  )
}