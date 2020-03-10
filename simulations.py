import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

np.random.seed(29)
die = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

incoming_roll = "10k8"
exploding_10 = True
exploding_9 = False
reroll_1 = False

incoming_roll = incoming_roll.split("k")

n_dice = int(incoming_roll[0])
ncols = keep_n = int(incoming_roll[1])

n_trials = 20_000

# rolls = np.random.choice(die, n_trials * n_dice).reshape(nrows, ncols)
rolls = np.random.choice(die, n_trials * n_dice).reshape(n_trials, n_dice)

df = pd.DataFrame(rolls)


def sum_n_highest(row, n):
    """ 
    sorts the values in a given row, keeps the n highest numbers
    returns the sum
    """
    return row.sort_values(ascending=False)[0:n].sum().astype(int)

df["final"] = df.apply(lambda x: sum_n_highest(x, keep_n), axis=1)


rolls = df.final

# Target number is the number to beat
target_number = 55

# This cal
p_rolling_higher_than_target = (rolls > target_number).sum() / len(rolls)
print(f"Probability of rolling higher than {target_number} with {incoming_roll} is %{p_rolling_higher_than_target*100}")