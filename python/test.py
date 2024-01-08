def main():
    # Check if the correct number of command line arguments is provided
    if len(sys.argv) != 2:
        print("Usage: python python-script.py <json_data_array>")
        sys.exit(1)

    # Extract the JSON data array from the command line argument
    json_data_array = sys.argv[1]

    try:
        # Parse the JSON data array
        data_array = json.loads(json_data_array)
        print("Received data array:", data_array)
        
        # Your processing logic here with the received array

    except ValueError as e:
        print("Hwllo")
        sys.exit(1)

if __name__ == "__main__":
    main()
