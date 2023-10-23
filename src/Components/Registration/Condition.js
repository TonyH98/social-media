

function Condition({open , onClose}){

    if(!open) return null

    return(
       <div className="overlay">
           <div className="modal-container">
            <div className="modalLeft">
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content terms">
            <p>
            Terms and Conditions
            <br/> <br/>
These terms and conditions govern the use of the social media app Hermes provided by Hoang Inc. By accessing or using the App, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms and conditions, you must not use the App.
<br/> <br/>
1. User Content
<br/> <br/>
1.1. Users are solely responsible for the content they post on the App. By posting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on the App.
<br/> <br/>
1.2. Users must not post content that is unlawful, defamatory, abusive, harassing, hateful, or discriminatory. We reserve the right to remove any such content at our sole discretion.
<br/> <br/>
2. User Conduct
<br/> <br/>
2.1. Users must not engage in any conduct that violates the rights of others or that is harmful, threatening, or abusive.
<br/> <br/>
2.2. Users must not use the App for any unlawful or unauthorized purpose, including but not limited to violating any applicable laws or regulations.
<br/> <br/>
3. Privacy
<br/> <br/>
3.1. We collect and use personal information in accordance with our Privacy Policy. By using the App, you consent to our collection and use of your personal information as outlined in the Privacy Policy.
<br/> <br/>
3.2. Users are responsible for maintaining the confidentiality of their account and password information. We are not liable for any unauthorized access to user accounts.
<br/> <br/>
4. Intellectual Property
<br/> <br/>
4.1. All intellectual property rights in the App and its content are owned by us or our licensors. Users must not use, copy, or distribute any content from the App without our prior written consent.
<br/> <br/>
5. Limitation of Liability
<br/> <br/>
5.1. We are not liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the App.
<br/> <br/>
5.2. We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any content posted by users.
<br/> <br/>
6. Termination
<br/> <br/>
6.1. We reserve the right to suspend or terminate a user's access to the App at any time for any reason without notice.
<br/> <br/>
7. Changes to Terms and Conditions
<br/> <br/>
7.1. We reserve the right to modify or replace these terms and conditions at any time. Users are responsible for regularly reviewing the terms and conditions.
<br/> <br/>
8. Governing Law
<br/> <br/>
8.1. These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction], and users agree to submit to the exclusive jurisdiction of the courts in [Jurisdiction].
<br/> <br/>
By using the App, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you must not use the App.

            </p>
           </div>

           </div>
        </div>
    )
}

export default Condition