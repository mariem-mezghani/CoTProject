package supcom.cot.forestfiredetection.entities;

import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;
import jakarta.json.bind.annotation.JsonbVisibility;
import java.io.Serializable;
import java.util.Objects;
@Entity
@JsonbVisibility(FieldPropertyVisibilityStrategy.class)
public class CameraDB implements Serializable  { // Sensor entity for the geolocation services, it will be stored in the database since the location won't change for each sensor.
    @Id
    private String id;

    @Column
    private Double longitude;

    @Column
    private Double latitude;

    public CameraDB() {
    }

    public CameraDB(String id, Double longitude, Double latitude) {
        this.id= id;
        this.longitude = longitude;
        this.latitude = latitude;

    }



    public String getId() {
        return id;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CameraDB)) {
            return false;
        }
        CameraDB sensor = (CameraDB) o;
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
                ", longitude=" + longitude +
                ", longitude=" + latitude +

                '}';
    }

}
