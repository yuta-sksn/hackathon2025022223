
import ReactMarkdown from 'react-markdown'
import classes from './LegalDocument.module.scss'
import { loadDocument } from '@/features/legal/api/loadDocument.server';

type LegalDocumentProps = {
  docName: string;
}

export default function LegalDocument({ docName }: LegalDocumentProps) {
  const { data, content } = loadDocument(docName);

  return (
    <>
      <section className={classes.legalDocumentSectionUpper}>
        {/* 法的文書のタイトル */}
        <h1 className={classes.legalDocumentTitle}>
          <span>{ data.title }</span>
        </h1>
      </section>

      <section className={classes.legalDocumentSectionDowner}>
        <div>
          <ReactMarkdown>{ content }</ReactMarkdown>
        </div>
      </section>
    </>
  )
}
