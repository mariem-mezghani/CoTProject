package supcom.cot.forestfiredetection.repositories;

import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;
import supcom.cot.forestfiredetection.entities.CameraDB;

import java.util.stream.Stream;
@Repository
public interface CameraDBRepository extends CrudRepository <CameraDB, String> { // repository containing the methods for interacting with SensorDB entity in mongodb
    Stream<CameraDB> findAll();

}
