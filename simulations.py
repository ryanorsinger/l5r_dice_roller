import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

np.random.seed(29)
die = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

incoming_roll = "5k4"
exploding_10 = True
exploding_9 = False
reroll_1 = False

incoming_roll = incoming_roll.split("k")

n_dice = int(incoming_roll[0])
ncols = keeps = int(incoming_roll[1])

n_trials = 20

# rolls = np.random.choice(d10, n_trials * n_dice).reshape(nrows, ncols)
rolls = np.random.choice(d10, n_trials * n_dice).reshape(n_trials, n_dice)


df = pd.DataFrame(rolls)


def sum_n_highest(row, n):
    """ 
    sorts the values in a given row, keeps the n highest numbers
    returns the sum
    """
    return row.sort_values(ascending=False)[0:n].sum().astype(int)

df["final"] = df.apply(lambda x: sum_n_highest(x, 4), axis=1)