import TopBar from "../navigation/TopBar.js";
import {MyContextProvider} from "../context.js";
import BottomContact from "../components/bottomContact.js";

function Story() {
  return (
    <div>
      <MyContextProvider>
        <TopBar />
        <div>
          <img src="/images/story.png" alt="story" style={{width: '100%'}} />
          <div style={{width: '100%', marginTop: '0.5em', textAlign: 'center', position: 'relative'}}>
            <h1>Our Story</h1>
            <div style={{width: '50%', padding: '1em', margin: 'auto'}}>
              <h5>
                I'm a paragraph. Click here to add your own text and edit me. 
                It’s easy. Just click “Edit Text” or double click me and 
                you can start adding your own content and make changes to the font.
                Feel free to drag and drop me anywhere you like on your page. I’m a 
                great place for you to tell a story and let your users know a little more about you.
              </h5>
            </div>
            <div style={{width: '50%', padding: '1em', margin: 'auto'}}>
              <h5>
                  This is a great space to write long text about your company and your services. 
                  You can use this space to go into a little more detail about your company. 
                  Talk about your team and what services you provide. Tell your visitors the story 
                  of how you came up with the idea for your business and what makes you different 
                  from your competitors. Make your company stand out and show your visitors who you are.
                </h5>
            </div>  
          </div>
        </div>
        <BottomContact />
      </MyContextProvider>
    </div>
  );
}

export default Story;
