package supcom.cot.forestfiredetection.entities;


import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;
import jakarta.json.bind.annotation.JsonbVisibility;
import java.io.Serializable;
import java.util.Objects;

@Entity
@JsonbVisibility(FieldPropertyVisibilityStrategy.class)
public class Sensor implements Serializable  { // Sensor entity for MQTT messages. This entity will be used to broadcast sensor data on websocket
    @Id
    private String id; //Sensor ID

    @Column
    private String value;

    public Sensor() {
    }

    public Sensor(String id, String value) {
        this.id= id;
        this.value = value;

    }


    //Getters
    public String getId() {
        return id;
    }
    public String getvalue() {
        return value;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sensor)) {
            return false;
        }
        Sensor sensor = (Sensor) o;
        return Objects.equals(id, sensor.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "id='" + id + '\'' +
                ", value='" + value +

                "'}";
    }

}
