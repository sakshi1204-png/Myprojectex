const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body; // Correct spelling of 'title'

    const income = new IncomeSchema({  // Use 'new' keyword to create a new instance
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validation checks
        if (!title || !description || !date || !category) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }

        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Please enter a valid amount." });
        }
        
        await income.save();
        console.log(income);  // Log the saved income
        return res.status(200).json({ message: "Income added successfully." });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({ message: "An error occurred while adding income.", error: error.message });
    }
    
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error Hogaya ree'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}



