import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report

# Load data from CSV file
df = pd.read_csv('e:\sjbit\python\studentPerformanceDataTrainingFinal1.csv')  # Replace 'your_data.csv' with your actual CSV file name

# Assuming the last column is the target variable
X = df.iloc[:, :-1]  # Features
y = df.iloc[:, -1]   # Target variable

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=43)

# Create a Gaussian Naive Bayes classifier
classifier = GaussianNB()

# Train the classifier on the training data
classifier.fit(X_train.values, y_train.values)

# Make predictions on the test data
predictions = classifier.predict(X_test.values)
print(sys.argv)
if len(sys.argv) != 19:
    print("Please provide exactly 19 values as command-line arguments.")
    sys.exit(1)

# Parse command-line arguments as float values
try:
    single_sample = [float(arg) for arg in sys.argv[1:]]
except ValueError:
    print("Invalid input. Please provide numeric values.")
    sys.exit(1)

# Test the single sample
predicted_class = classifier.predict([single_sample])

#single_sample = [[12, 22, 23, 14, 15,19,22,18,17,18,15]]
#predicted_class = classifier.predict(single_sample)

# Print the predicted class


#Evaluate the classifier
#accuracy = accuracy_score(y_test, predictions)
#print(accuracy)
#Display classification report
#print("Classification Report:")
#print(classification_report(y_test, predictions))

print(predicted_class[0])



