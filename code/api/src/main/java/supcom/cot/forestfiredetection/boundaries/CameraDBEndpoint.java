package supcom.cot.forestfiredetection.boundaries;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import supcom.cot.forestfiredetection.entities.CameraDB;
import supcom.cot.forestfiredetection.repositories.CameraDBRepository;

import java.util.List;
import java.util.function.Supplier;

import static java.util.stream.Collectors.toList;
@ApplicationScoped
@Path("camera") //The path where the REST service is going to be implemented
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)  // @produces and @consumes to specifiy that the data sent and received is in JSON format
public class CameraDBEndpoint {
    private static final Supplier<WebApplicationException> NOT_FOUND =
            () -> new WebApplicationException(Response.Status.NOT_FOUND);

    @Inject
    private CameraDBRepository repository; // Inject the repository to  utilize its methods of interacting with the database
    @GET
    public List<CameraDB> findAll() { //GET METHOD to receive a list of all SensorDB data from the database
        return repository.findAll()
                .collect(toList());
    }
    @POST // POST METHOD to send the data of the sensor in JSON format and save it in the database
    public void save(CameraDB sensor) {
        repository.save(sensor);
    }

    @OPTIONS  // Add this method to handle preflight requests
    public Response preflight() {
        return Response.ok().build();
    }

}
