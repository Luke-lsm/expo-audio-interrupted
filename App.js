import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect} from "react";
import {useAudioPlayer, useAudioPlayerStatus} from "expo-audio";
import {Asset} from "expo-asset";

export default function App() {
    const track = {uri: Asset.fromModule(require('./assets/audio/sound.mp3')).uri};

    const progressUpdateInterval = 500

    const player = useAudioPlayer(track, progressUpdateInterval);
    const playerStatus = useAudioPlayerStatus(player);

    player.loop = true;

    useEffect(() => {
        console.log('Current time:', playerStatus.currentTime);
    }, [playerStatus.currentTime]);

    useEffect(() => {
        console.log('Player paused:', player.paused);
        console.log("Player current time is: ", playerStatus.currentTime)
        console.log("Player playback is: ", playerStatus.reasonForWaitingToPlay)
    }, [player.paused]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    if (player.playing) {
                        player.pause();
                    } else {
                        player.play()
                    }
                }}
                style={{padding: 20, backgroundColor: 'blue', borderRadius: 5}}
            >
                {player.playing ?
                    <Text>Pause Audio</Text> :
                    <Text>Play Audio</Text>}
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
