(()=>{
  const CLIENT_ID="4ee3e5d2-4598-4656-8e20-358dc63226da";
  const TENANT_ID="04bfc180-5650-4f0b-9a97-22fc45c33b9c";
  const DRIVE_ID="b!mHxEWCmG-0y14Wt0aU0_QDaA0rsZ8B5FiMPSoVGVGxtQB05Ma-PiQYN8Ip53UA-n";
  const SCOPES=["User.Read","Files.ReadWrite"];
  const APPROVAL_DIR="Ghetto Wookie Studios/Studio Production/Archived Working Tracks";
  const $=id=>document.getElementById(id);
  let helper=null;

  async function token(){
    if(!helper){
      helper=new msal.PublicClientApplication({auth:{clientId:CLIENT_ID,authority:"https://login.microsoftonline.com/"+TENANT_ID,redirectUri:"https://ghettowookie.com/gwstudios.html"},cache:{cacheLocation:"sessionStorage"}});
      await helper.initialize();
    }
    const account=helper.getActiveAccount()||helper.getAllAccounts()[0];
    if(!account)throw new Error("No signed-in GW Studios account found");
    return (await helper.acquireTokenSilent({account,scopes:SCOPES})).accessToken;
  }

  const approvalUrl=id=>"https://graph.microsoft.com/v1.0/drives/"+DRIVE_ID+"/root:/"+APPROVAL_DIR.split("/").map(encodeURIComponent).join("/")+"/"+encodeURIComponent(".gw-approval-"+id+".json")+":/content";

  function apply(a={}){
    const shag=a.Shag||{},bo=a.Bo||{};
    if($("shagApproval"))$("shagApproval").value=shag.decision||"";
    if($("shagApprovalComments"))$("shagApprovalComments").value=shag.comments||"";
    if($("shagPreviousComments"))$("shagPreviousComments").textContent=shag.comments||"No previous comments.";
    if($("boApproval"))$("boApproval").value=bo.decision||"";
    if($("boApprovalComments"))$("boApprovalComments").value=bo.comments||"";
    if($("boPreviousComments"))$("boPreviousComments").textContent=bo.comments||"No previous comments.";
    const s=$("approvalStatus");
    if(s){
      const sd=shag.decision||"",bd=bo.decision||"";
      s.textContent=(sd==="Rejected"||bd==="Rejected")?"Rejected — Archive":(sd==="Approved"&&bd==="Approved")?"Ready to Master":"Awaiting approvals";
    }
  }

  async function load(id){
    if(!id)return;
    try{
      const t=await token();
      const r=await fetch(approvalUrl(id),{headers:{Authorization:"Bearer "+t}});
      if(r.ok)apply(await r.json()); else if(r.status===404)apply({});
    }catch(e){console.warn("Approval load unavailable",e)}
  }

  async function save(role){
    const id=window.activeApprovalTrackId,s=$("approvalStatus");
    if(!id){if(s)s.textContent="No active track selected.";return}
    if(s)s.textContent="Saving "+role+" decision…";
    try{
      const t=await token();
      let a={};
      const existing=await fetch(approvalUrl(id),{headers:{Authorization:"Bearer "+t}});
      if(existing.ok)a=await existing.json();
      a[role]={
        decision:$(role==="Shag"?"shagApproval":"boApproval").value,
        comments:$(role==="Shag"?"shagApprovalComments":"boApprovalComments").value.trim(),
        savedAt:new Date().toISOString()
      };
      const r=await fetch(approvalUrl(id),{method:"PUT",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"},body:JSON.stringify(a)});
      if(!r.ok)throw new Error("Save returned "+r.status);
      apply(a);
      if(s)s.textContent=role+" decision saved to GW Archives";
    }catch(e){if(s)s.textContent="Could not save "+role+" decision: "+e.message;console.error(e)}
  }

  document.addEventListener("click",e=>{
    const row=e.target.closest(".tracks-mode .song-row");
    if(!row)return;
    setTimeout(()=>{
      const archive=$("archiveTrackButton");
      if(archive)archive.hidden=false;
      load(row.dataset.itemId);
    },300);
  });

  [["saveShagApproval","Shag"],["saveBoApproval","Bo"]].forEach(([id,role])=>{
    const button=$(id);
    if(!button)return;
    button.addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();save(role)},true);
  });
})();