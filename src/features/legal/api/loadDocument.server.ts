import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadDocument(docName: string) {
  const filePath = path.join(process.cwd(), 'src', 'documents', `${docName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}