# PyTorch Stock Prediction with Multivariate LSTM

This project implements a stock price prediction model using **Long Short-Term Memory (LSTM)** networks in **PyTorch**. It utilizes a multivariate approach, incorporating historical prices and technical indicators to predict the next day's closing price.

## Features

* **Data Acquisition**: Automatically downloads historical stock data using `yfinance`.
* **Technical Analysis**: Calculates 18 distinct features, including:
    * Moving Averages (MA 50, 100, 200)
    * Relative Strength Index (RSI)
    * MACD (Moving Average Convergence Divergence)
    * Bollinger Bands
    * Volume Moving Average and Price Range
* **Deep Learning Model**: A stacked LSTM architecture built with PyTorch.
* **Robust Evaluation**: Uses **Walk-Forward Validation** to simulate real-world trading performance and provides detailed metrics like Directional Accuracy and RMSE.
* **GPU Acceleration**: The model leverages **CUDA** if available, allowing training to be **26 times faster** on **Google Colab** with T4 GPU support.

## Detailed Model Architecture

The architecture used in this project is a **stacked multivariate LSTM** network. It is designed to process sequential time-series data where the model looks at the past 100 days of market activity to predict the next day's closing price.

### 1. Input Layer

* **Input Size:** 18 features.
* **Input Shape:** `(Batch Size, 100, 18)`.
* **Sequence Length:** A "lookback" window of 100 days is used, meaning each prediction is based on the patterns found in the previous 100 trading sessions.

### 2. LSTM Layers (Stacked)

* **Layer 1 (Encoder):** 128 hidden units. This layer identifies complex temporal dependencies within the 18 input features. A **Dropout (20%)** is applied to prevent overfitting.
* **Layer 2 (Refinement):** 64 hidden units. This second layer further processes the temporal features. The model uses a **Many-to-One** approach, passing only the final hidden state of this layer to the dense layers.

### 3. Fully Connected (Dense) Layers

The output from the LSTM is mapped back to a single price value through two linear layers:

* **Linear Layer 1:** Reduces the 64 hidden units to 32.
* **Activation:** A **ReLU (Rectified Linear Unit)** function is used to introduce non-linearity.
* **Linear Layer 2 (Output):** Maps the 32 units to a single scalar value representing the predicted "Close" price.

### 4. Training Logic

* **Loss Function:** `MSELoss` (Mean Squared Error), which penalizes large gaps between predicted and actual prices.
* **Optimizer:** `Adam` (Adaptive Moment Estimation) for efficient gradient descent.
* **Normalization:** All inputs are passed through a `MinMaxScaler`. Because LSTMs are sensitive to scale, all 18 features are normalized to a range between 0 and 1.

## Installation

To run this notebook, you will need Python 3.x and the following dependencies:

```bash
pip install numpy pandas matplotlib seaborn yfinance torch scikit-learn
````

## Usage

1. Open the `PyTorch_Stock_Prediction_LSTM_v2.ipynb` notebook.
2. Set your desired ticker symbol (default is `AAPL`).
3. Run the cells sequentially to:

   * Download data and engineer technical features.
   * Initialize the `MultivariateLSTM` class.
   * Execute the **Walk-Forward Validation** loop.
   * Visualize the prediction vs. actual price performance.

## Evaluation Results

The project produces high-fidelity visualizations and metrics:

* **Actual vs. Predicted Prices**: Visual alignment of the model's predictions against real market data.
* **Directional Accuracy**: A metric showing how often the model correctly predicted the "trend" (up or down).
* **Error Distribution**: Histograms of residuals to identify prediction bias.
* **Fold Metrics**: Performance consistency across different time segments of the historical data.

## Disclaimer

*This project is for educational purposes only. Stock market prediction is inherently volatile, and these models should not be used as the sole basis for financial decisions or actual trading.*

## License

This project is licensed under the MIT License.

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

### Steps for Contribution:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/feature-name`)
6. Open a pull request

## Acknowledgments

* **[yfinance](https://github.com/ranaroussi/yfinance)** for easy-to-use financial data.
* **[PyTorch](https://pytorch.org/)** for providing the deep learning framework.
* **[Scikit-learn](https://scikit-learn.org/)** for tools to help with feature engineering and validation.

