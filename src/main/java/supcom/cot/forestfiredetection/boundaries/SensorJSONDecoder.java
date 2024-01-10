package supcom.cot.forestfiredetection.boundaries;


import jakarta.json.Json;
import jakarta.json.JsonObject;
import java.io.StringReader;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import supcom.cot.forestfiredetection.entities.Sensor;

public class SensorJSONDecoder implements Decoder.Text<Sensor>{

    @Override
    public Sensor decode(String jsonMessage) throws DecodeException {

        JsonObject jsonObject = Json
                .createReader(new StringReader(jsonMessage)).readObject();
        String id=jsonObject.getString("id");
        String value=jsonObject.getString("value");
        Sensor sensor = new Sensor(id,value);
        System.out.println("decoded sensor: " + sensor);
        return sensor;

    }

    @Override
    public boolean willDecode(String jsonMessage) {
        try {
            // Check if incoming message is valid JSON
            Json.createReader(new StringReader(jsonMessage)).readObject();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}