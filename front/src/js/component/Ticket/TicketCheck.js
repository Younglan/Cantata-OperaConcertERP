import { useEffect, useRef, useState } from "react";
import { Alert, Vibration } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";


function TicketCheck(){
    
        const [scaned, setScaned] = useState(true);
        const ref = useRef(null);
      
        useEffect(() => {
          
          setScaned(true);
        }, []);
        const updateTicketStatus = (ticket) =>{
            const token = sessionStorage.getItem("jwt");
            fetch(`http://localhost:8090/ticket/ticketcheck/?ticket=${ticket}`, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type':'application/json','Authorization': token}
                })
            .then(response => {
                if(response.ok){
                    
                }
                else{
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
        };
        const onBarCodeRead = (event) => {
            if (!scaned) return;
            setScaned(false);
            Vibration.vibrate();
            updateTicketStatus(event.nativeEvent.codeStringValue);
             Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
            { text: `예매번호 : ${event.nativeEvent.codeStringValue} 검표완료`, onPress: () => setScaned(true) },
          ]);
        };
    return(
        <div>
            <Camera
                
                ref={ref}
                cameraType={CameraType.Back} 
                zoomMode
                focusMode
                scanBarcode
                showFrame={false}
                laserColor="rgba(0, 0, 0, 0)"
                frameColor="rgba(0, 0, 0, 0)"
                surfaceColor="rgba(0, 0, 0, 0)"
                onReadCode={onBarCodeRead}
            />
        </div>  
    );
}

export default TicketCheck;

