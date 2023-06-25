import server.SMTPServerHandler;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Server {
    public static void main(final String[] args) {
        SMTPServerHandler smtpServer = new SMTPServerHandler();
        try{
            smtpServer.startServer(getPort(), getBindAddress());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * @return either the default port, or the custom port, if specified.
     * @throws NumberFormatException if the specified port cannot be parsed to an integer.
     */
    private static int getPort() {
        return 6525;
    }

    /**
     * @return an InetAddress representing the specified bind address, or null, if not specified
     * @throws UnknownHostException if the bind address is invalid
     */
    private static InetAddress getBindAddress() throws UnknownHostException {
        return InetAddress.getByName("127.0.0.1");
    }
}
