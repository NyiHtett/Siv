import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import useChannelSettings from "../../../shared/hooks/useChannelSettings";
import ChannelSettings from "./ChannelSettings";
import PasswordSettings from "./PasswordSettings";
import StreamKey from "./StreamKey";

const Settings = () => {

    const {channelSettings, isFetching, saveSettings} = useChannelSettings();

    if(isFetching) {
        return (<LoadingSpinner/>);
    }

    return(
        <div className="settings-container"> 
            <span>Settings</span>
            <ChannelSettings settings={
                channelSettings 
            }
            saveSettings ={saveSettings}
            />
            <PasswordSettings/>
            <StreamKey streamKey={channelSettings.streamKey} />
        </div>
    )
}

export default Settings;