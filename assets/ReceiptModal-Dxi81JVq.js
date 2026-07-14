import{c as x,u as j,h as b,b as y,r as v,j as e,m as p,k as _,B as m,X as N,g as w}from"./index-XJdk1Tax.js";import{u as C}from"./useAppDate-VDZyoAZJ.js";import{D as k,a as z}from"./dialog-XYfm9yUe.js";import{C as S}from"./smartphone-CeUIuvzy.js";import{P as T}from"./printer-CXrZV9l3.js";const M=x("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]),F=x("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),B={cash:"Espèces",mvola:"MVola",orange_money:"Orange Money",airtel_money:"Airtel Money"};function D({open:a,onClose:l,transaction:s}){const{formatCurrency:n}=j(),{enableTables:r}=b(),{data:h}=y({queryKey:["settings"],queryFn:()=>w.entities.Settings.get()}),{formatDate:d}=C(),i=h||{},g=()=>{const t=window.open("","","width=400,height=600");let o=document.getElementById("receipt-content").innerHTML;const u=window.location.origin;o=o.replace(/src="\/uploads\//g,`src="${u}/uploads/`),t.document.write(`
      <html>
        <head>
          <title>Facture ${s?.reference}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
              font-family: 'Courier Prime', 'Courier New', monospace !important;
              font-weight: 700 !important;
              text-transform: uppercase !important;
            }
            body { 
              font-family: 'Courier Prime', 'Courier New', monospace !important;
              padding: 10px;
              font-size: 12px;
              line-height: 1.3;
              font-weight: 700;
            }
            .receipt { max-width: 300px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: center; text-align: left; margin-bottom: 8px; border-bottom: 1px dashed #000; padding-bottom: 8px; gap: 15px; }
            .header-info { flex: 1; }
            .logo { width: 80px; height: 60px; object-fit: contain; object-position: right center; }
            .business-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
            .info-line { font-size: 10px; margin: 1px 0; }
            .section { margin: 8px 0; }
            .section-title { font-weight: 700; margin-bottom: 5px; text-transform: uppercase; font-size: 10px; }
            .item { display: flex; justify-content: space-between; margin: 3px 0; }
            .divider { border-top: 1px dashed #666; margin: 5px 0; }
            .subtotal { font-size: 11px; margin-top: 5px; }
            .vip-charge { font-size: 11px; margin-top: 3px; color: #f59e0b; font-weight: 700; }
            .total { font-size: 14px; font-weight: 700; margin-top: 5px; padding-top: 5px; border-top: 2px solid #000; }
            .payment-info { margin-top: 8px; font-size: 11px; }
            .amount-due { color: #dc2626; font-weight: 700; background: #fee2e2; padding: 4px; border-radius: 4px; margin-top: 5px; }
            .footer { text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #000; font-size: 10px; }
            .vip-badge { 
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              color: white;
              padding: 4px 10px;
              border-radius: 4px;
              display: inline-block;
              font-size: 10px;
              font-weight: 700;
              margin-top: 5px;
            }
            @media print {
              @page { margin: 0; }
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            ${o}
          </div>
        </body>
      </html>
    `),t.document.close(),setTimeout(()=>{t.print(),t.close()},500)};if(v.useEffect(()=>{s&&a&&console.log("🧾 Receipt Transaction Data:",{payment_method:s.payment_method,amount_given:s.amount_given,total_amount:s.total_amount,shouldShow:String(s.payment_method).toLowerCase()==="cash"&&s.amount_given>0})},[s,a]),!s)return null;const f=Array.isArray(s.items)?s.items:typeof s.items=="string"?(()=>{try{return JSON.parse(s.items)}catch{return[]}})():[];return e.jsx(k,{open:a,onOpenChange:l,children:e.jsx(z,{className:"sm:max-w-md bg-white",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs(p.div,{initial:{scale:0},animate:{scale:1},className:"flex flex-col items-center py-4",children:[e.jsx(p.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-lg",children:e.jsx(S,{className:"w-10 h-10 text-white"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"Paiement réussi !"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Transaction validée"})]}),e.jsx("div",{className:"bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 max-h-[400px] overflow-y-auto",children:e.jsxs("div",{id:"receipt-content",className:"receipt",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-info",children:[e.jsx("div",{className:"business-name",children:i.business_name||"StandPOS"}),i.business_address&&e.jsx("div",{className:"info-line",children:i.business_address}),i.business_phone&&e.jsxs("div",{className:"info-line",children:["Tél: ",i.business_phone]}),i.nif&&e.jsxs("div",{className:"info-line",children:["NIF: ",i.nif]}),i.stat&&e.jsxs("div",{className:"info-line",children:["STAT: ",i.stat]})]}),i.business_logo&&e.jsx("img",{src:i.business_logo,alt:"Logo",className:"logo"})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"item",children:e.jsxs("span",{style:{fontWeight:"bold"},children:["Facture N°: ",s.reference]})}),r&&s.table_number&&e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Table:"}),e.jsx("span",{style:{fontWeight:"bold"},children:s.table_number})]}),s.partner_name&&e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Client:"}),e.jsx("span",{children:s.partner_name})]}),s.phone_number&&e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Tél:"}),e.jsx("span",{children:s.phone_number})]}),r&&s.is_vip&&e.jsx("div",{style:{textAlign:"center"},children:e.jsx("span",{className:"vip-badge",children:"★ TABLE VIP ★"})}),e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Paiement:"}),e.jsx("span",{children:B[s.payment_method]||s.payment_method})]}),s.updated_at&&e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Date:"}),e.jsx("span",{style:{fontWeight:"bold"},children:d(s.updated_at)})]}),s.transaction_ref&&["mvola","orange_money","airtel_money","visa"].includes(s.payment_method)&&e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Réf. Transaction:"}),e.jsx("span",{style:{fontWeight:"bold"},children:s.transaction_ref})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Articles"}),f.map((t,c)=>e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold",marginBottom:"3px"},children:t.product_name}),e.jsxs("div",{className:"item",style:{fontSize:"11px",paddingLeft:"10px"},children:[e.jsxs("span",{children:[_(t.quantity,t.unit)," ",t.unit," x ",n(t.unit_price)]}),e.jsx("span",{children:n(t.total)})]})]},c))]}),s.is_vip&&i.vip_charge?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"subtotal",children:e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Sous-total"}),e.jsx("span",{children:n((s.total_amount||0)-(i.vip_charge||0))})]})}),e.jsx("div",{className:"vip-charge",children:e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"★ Frais Table VIP"}),e.jsxs("span",{children:["+",n(i.vip_charge)]})]})})]}):null,e.jsx("div",{className:"total",children:e.jsxs("div",{className:"item",style:{fontSize:"16px"},children:[e.jsx("span",{children:"TOTAL"}),e.jsx("span",{children:n(s.total_amount)})]})}),(s.amount_paid!==void 0||s.amount_due>0)&&e.jsxs("div",{className:"payment-info",children:[s.is_debt_settlement&&s.paid_now&&e.jsxs("div",{style:{marginBottom:"10px",padding:"8px",border:"1px solid #000",borderRadius:"4px",backgroundColor:"#f9fafb"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"bold",textTransform:"uppercase",marginBottom:"4px",color:"#111827"},children:"Règlement de dette"}),e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Montant versé:"}),e.jsx("span",{style:{fontSize:"14px",fontWeight:"bold"},children:n(s.paid_now)})]}),e.jsxs("div",{style:{fontSize:"10px",fontStyle:"italic",marginTop:"2px",color:"#4b5563"},children:["Régularisation pour la vente du ",d(s.created_date)]})]}),s.amount_due>0&&e.jsx("div",{className:"amount-due",children:e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Reste à payer"}),e.jsx("span",{children:n(s.amount_due)})]})}),String(s.payment_method).toLowerCase()==="cash"&&s.amount_given>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"divider"}),e.jsxs("div",{className:"item",children:[e.jsx("span",{children:"Montant donné"}),e.jsx("span",{style:{fontWeight:"bold"},children:n(s.amount_given)})]}),e.jsxs("div",{className:"item",style:{fontSize:"14px",fontWeight:"bold"},children:[e.jsx("span",{children:"Rendu"}),e.jsx("span",{children:n(s.amount_given-s.total_amount)})]})]})]}),e.jsx("div",{className:"footer",children:i.receipt_footer&&e.jsx("div",{style:{marginBottom:"10px",fontStyle:"italic"},children:i.receipt_footer})})]})}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(m,{variant:"outline",onClick:l,className:"flex-1 rounded-xl",children:[e.jsx(N,{className:"w-4 h-4 mr-2"}),"Fermer"]}),e.jsxs(m,{onClick:g,className:"flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/30",children:[e.jsx(T,{className:"w-4 h-4 mr-2"}),"Imprimer"]})]})]})})})}export{M as B,F as C,D as R};
