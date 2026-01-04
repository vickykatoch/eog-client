FROM ubuntu:22.04

WORKDIR /amps

# Copy your AMPS distribution into the image
COPY amps-server/ /amps/
COPY rates_instruments.json /amps/rates_instruments.json
# Copy config
COPY config.xml /amps/config.xml

# Ensure server binary is executable (adjust name if different)
RUN chmod +x /amps/bin/ampServer || true

# Install Java 17
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Set JAVA_HOME and update PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Expose AMPS ports (adjust to your config)
EXPOSE 9007 9008 8085

# Start AMPS (adjust command/binary name if different)
CMD ["./bin/ampServer", "config.xml"]