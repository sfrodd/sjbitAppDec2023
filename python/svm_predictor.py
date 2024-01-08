# svm_example.py
import sys
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score



# Load the CSV file
df = pd.read_csv('e:\sjbit\python\studentPerformanceDataTraining2.csv')

# Split the data into features and target
X = df.drop('target', axis=1)
y = df['target']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=34)

# Normalize the features (optional but recommended for SVM)
# You can use other scaling methods as well
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create an SVM model
model = SVC(kernel='rbf')

# Train the model
model.fit(X_train_scaled, y_train)

sample_to_test = [23,18.5,21,21,19,21,25,17,22,21,18]

sample_to_test_scaled = scaler.transform([sample_to_test])

# Predict the class of the single sample
predicted_class = model.predict(sample_to_test_scaled)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Evaluate the accuracy of the model
accuracy = accuracy_score(y_test, y_pred)
print(predicted_class[0])