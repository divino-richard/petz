export async function imageUrlToFile(url: string) {
  const randomFileName = Math.random().toString(36).substring(2, 10) + Date.now() + '.png';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const file = new File([buffer], randomFileName, { type: 'image/png' });
  return file;
} 