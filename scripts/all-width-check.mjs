import { chromium } from 'playwright';
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173';
const browser=await chromium.launch({ channel:'msedge' });
const routes=['/','/perfil','/servicios','/contacto','/agenda','/aviso-de-privacidad','/pagina-inexistente'];
const issues=[];
for(const width of [320,360,390,768,1024,1280,1440]){
 const context=await browser.newContext({ viewport:{width,height:800}, reducedMotion:'reduce' });
 const page=await context.newPage();
 page.on('pageerror',e=>issues.push(`${width} ${page.url()} error: ${e.message}`));
 for(const route of routes){
  await page.goto(baseUrl+route,{waitUntil:'networkidle'});
  const d=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,sh:document.documentElement.scrollHeight,t:document.title}));
  if(d.sw>d.cw+1) issues.push(`${width} ${route} overflow ${d.sw}>${d.cw}`);
  console.log(width, route, `${d.sw}x${d.sh}`, d.t.slice(0,55));
 }
 await context.close();
}
await browser.close();
if(issues.length){console.error('\nISSUES');issues.forEach(i=>console.error(i));process.exitCode=1}else console.log('\nAll routes at all widths: no horizontal overflow or page errors.');
